git add .
git commit -m 'add week7'
git push origin main
git checkout gh-pages
cd dist
git add .
git commit -m 'add week7'
git push origin gh-pages
echo 'finish deploy'