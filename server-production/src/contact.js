// Formulaire de contact de la vitrine, audit de lancement, 22 nov. 2026 :
// validation des champs, mêmes sujets que le formulaire, sans stockage.
import { z } from 'zod';

export const SUJETS_CONTACT = ['Renseignements généraux', 'Camps', 'Dons', 'Qui sommes-nous'];

export const schemaMessageContact = z.object({
  nom: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  telephone: z.string().trim().max(30).optional().default(''),
  sujet: z.enum(SUJETS_CONTACT),
  message: z.string().trim().min(10).max(2000),
  actus: z.boolean().optional().default(false),
  // Champ piège anti-spam : invisible pour un humain, un robot le
  // remplit. La route répond succès sans envoyer quand il est rempli.
  site: z.string().max(100).optional().default(''),
});

export function validerMessageContact(corps) {
  return schemaMessageContact.parse(corps);
}
