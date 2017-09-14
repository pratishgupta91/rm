Write-Host "Hello World"
 
git config --global user.email "pratishgupta91@gmail.com"
git config --global user.name "pratish"
git config --global core.autocrlf input

Remove-Item .\node_modules -Force -Recurse
Remove-Item .\tsrc -Force -Recurse
Remove-Item .\app -Force -Recurse
Remove-Item .\manifests -Force -Recurse
Remove-Item .\.vscode -Force -Recurse
Remove-Item .\.gitignore -Force
Remove-Item .\gulpfile.js -Force
Remove-Item .\package.json -Force
Remove-Item .\tsconfig.json -Force

$buildName = "Build_$(get-date -f MM_dd_yyyy_HH_mm_ss)"

Write-Host "checking status"
git status

Write-Host "listing branches"
git branch --all

Write-Host "checking out to build branch"
git checkout master -q
git branch --all
git checkout -b $buildName -q

Write-Host "add and commit changes"
git add --all
git commit -m "build" -q

Write-Host "pushing to remote"
git push -u origin $buildName -q