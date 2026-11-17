// Registre des sockets WebSocket de signalisation d'appels,
// 16 nov. 2026. Un membre peut avoir plusieurs sockets ouverts
// (téléphone et web, par exemple) : un signal est diffusé à tous
// ses sockets ouverts. Le registre ne connaît que des sockets
// (duck typing : readyState et send), jamais Fastify, pour être
// testé sans serveur : les tests utilisent de fausses sockets.
// Une socket morte ou fermée est retirée à la diffusion, jamais
// laissée dans le registre.

export class RegistreSocketsAppels {
  constructor() {
    this._sockets = new Map();
  }

  inscrire(membreId, socket) {
    if (!membreId || !socket) return;
    let lot = this._sockets.get(membreId);
    if (!lot) {
      lot = new Set();
      this._sockets.set(membreId, lot);
    }
    lot.add(socket);
  }

  retirer(membreId, socket) {
    const lot = this._sockets.get(membreId);
    if (!lot) return;
    lot.delete(socket);
    if (lot.size === 0) this._sockets.delete(membreId);
  }

  /// Nombre de sockets ouverts pour un membre (tests et journaux).
  nombre(membreId) {
    return this._sockets.get(membreId)?.size ?? 0;
  }

  /// Diffuse un message déjà en JSON à tous les sockets ouverts
  /// du membre. Retourne le nombre de sockets joints. Une socket
  /// fermée ou en échec est retirée, sans jamais lever.
  diffuser(membreId, message) {
    const lot = this._sockets.get(membreId);
    if (!lot || lot.size === 0) return 0;
    let envoyes = 0;
    for (const socket of [...lot]) {
      try {
        if (socket.readyState === 1) {
          socket.send(message);
          envoyes++;
        } else {
          lot.delete(socket);
        }
      } catch (_) {
        lot.delete(socket);
      }
    }
    if (lot.size === 0) this._sockets.delete(membreId);
    return envoyes;
  }
}
