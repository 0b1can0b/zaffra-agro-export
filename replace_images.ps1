$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    # Specific images we know from index.html and others
    $content = $content -replace 'https://images\.unsplash\.com/[^"]*?1601493700631[^"]*', 'images/fresh_fruits.png'
    $content = $content -replace 'https://images\.unsplash\.com/[^"]*?1576045057995[^"]*', 'images/fresh_vegetables.png'
    $content = $content -replace 'https://images\.unsplash\.com/[^"]*?1565680018434[^"]*', 'images/seafood.png'
    $content = $content -replace 'https://images\.unsplash\.com/[^"]*?1574323347407[^"]*', 'images/agricultural_products.png'
    $content = $content -replace 'https://images\.unsplash\.com/[^"]*?1596040033229[^"]*', 'images/spices.png'
    $content = $content -replace 'https://images\.unsplash\.com/[^"]*?1589330273594[^"]*', 'images/origin_story.png'
    
    # Replace all remaining unsplash images with hero_field.png
    $content = $content -replace 'https://images\.unsplash\.com/[^"]+', 'images/hero_field.png'
    
    Set-Content -Path $f.FullName -Value $content
}
Write-Host "Image replacement complete."
