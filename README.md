# Shiny Living Dex - refonte

Version refondue de l'application Shiny Living Dex.

Ouvrir `index.html` dans un navigateur, ou lancer un serveur local dans ce dossier:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Puis ouvrir `http://127.0.0.1:8765`.

## Structure

- `index.html`: app unique, sans page menu intermediaire.
- `styles/`: styles separes entre base et interface.
- `src/storage.js`: sauvegarde locale, import et export.
- `src/stats.js`: calculs de progression.
- `src/app.js`: rendu, filtres, grille, panneau detail.
- `data/pokemon.base.json`: donnees source lisibles.
- `data/pokemon-data.js`: donnees chargeables directement par le navigateur.
- `data/collection.template.json`: format compatible avec l'ancien export.
