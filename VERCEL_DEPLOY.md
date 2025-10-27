# Guide de déploiement sur Vercel

## ✅ Fichier vercel.json créé

Le fichier `vercel.json` a été créé pour configurer correctement le déploiement Next.js.

## 🔑 Configuration de la clé API TMDB sur Vercel

**IMPORTANT**: Vous devez ajouter la variable d'environnement sur Vercel :

### Option 1 : Via l'interface Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez une nouvelle variable :
   - **Name**: `NEXT_PUBLIC_TMDB_API_KEY`
   - **Value**: votre clé API TMDB (obtenez-la sur https://www.themoviedb.org/settings/api)
   - **Environment**: Production, Preview, Development (cochez les trois)
5. **Cliquez sur "Save"**
6. **Redéployez** votre projet (Settings > Deployments > ... > Redeploy)

### Option 2 : Via Vercel CLI

```bash
# Installez Vercel CLI si nécessaire
npm i -g vercel

# Ajoutez la variable d'environnement
vercel env add NEXT_PUBLIC_TMDB_API_KEY production
vercel env add NEXT_PUBLIC_TMDB_API_KEY preview
vercel env add NEXT_PUBLIC_TMDB_API_KEY development

# Redéployez
vercel --prod
```

## 📝 Variables d'environnement requises

| Variable                   | Valeur             | Où l'obtenir                            |
| -------------------------- | ------------------ | --------------------------------------- |
| `NEXT_PUBLIC_TMDB_API_KEY` | Votre clé API TMDB | https://www.themoviedb.org/settings/api |

## 🚀 Déploiement

Une fois que vous avez configuré la variable d'environnement :

```bash
# Poussez vos changements
git add .
git commit -m "Configure Vercel deployment"
git push

# Vercel déploiera automatiquement
```

## ✅ Vérification

Après le déploiement, vérifiez que :

1. Le site se charge sans erreur 401
2. Les films s'affichent correctement
3. La console du navigateur (F12) ne montre pas d'erreurs API

Si vous voyez toujours des erreurs 401, assurez-vous que :

- La variable d'environnement est bien nommée `NEXT_PUBLIC_TMDB_API_KEY` (exactement)
- Elle est disponible pour tous les environnements (Production, Preview, Development)
- Vous avez redéployé après avoir ajouté la variable

## 📚 Ressources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [TMDB API Documentation](https://developer.themoviedb.org/docs/getting-started)
