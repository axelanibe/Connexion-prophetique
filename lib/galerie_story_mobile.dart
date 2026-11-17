// Galerie de l'appareil pour la création de story, 17 nov. 2026 :
// implémentation téléphone avec photo_manager. Ce fichier importe
// dart:io par photo_manager, il n'est compilé que sur téléphone,
// jamais sur le web (import conditionnel dans galerie_story.dart).
import 'package:photo_manager/photo_manager.dart';

import 'galerie_story_types.dart';

ChargeurGalerie creerChargeurGalerie() => _ChargeurGalerieMobile();

class _ChargeurGalerieMobile implements ChargeurGalerie {
  @override
  Future<GalerieChargee> charger() async {
    final permission = await PhotoManager.requestPermissionExtend();
    if (!permission.hasAccess) {
      return GalerieChargee(elements: const [], autorisee: false);
    }
    final albums = await PhotoManager.getAssetPathList(type: RequestType.common, onlyAll: true);
    if (albums.isEmpty) return GalerieChargee(elements: const [], autorisee: true);
    final assets = await albums.first.getAssetListPaged(page: 0, size: 60);
    final elements = <ElementGalerie>[];
    for (final asset in assets) {
      if (asset.type != AssetType.image && asset.type != AssetType.video) continue;
      final vignette = await asset.thumbnailDataWithSize(const ThumbnailSize(200, 200));
      if (vignette == null) continue;
      elements.add(ElementGalerie(
        estVideo: asset.type == AssetType.video,
        vignette: vignette,
        duree: asset.type == AssetType.video ? Duration(seconds: asset.duration) : Duration.zero,
        nom: asset.title ?? (asset.type == AssetType.video ? 'story.mp4' : 'story.jpg'),
        chargerOctets: () async {
          final fichier = asset.type == AssetType.video ? await asset.loadFile() : await asset.file;
          if (fichier == null) return null;
          return fichier.readAsBytes();
        },
      ));
    }
    return GalerieChargee(elements: elements, autorisee: true);
  }
}
