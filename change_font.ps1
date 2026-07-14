$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    # Replace Playfair Display URL with Lora
    $content = $content -replace 'family=Playfair\+Display:ital,wght@[^&]+&', 'family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&'
    
    Set-Content -Path $f.FullName -Value $content
}
Write-Host "Font replacement complete."
