# Create logs directory if it doesn't exist
$logDirectory = ".\logs"
if (!(Test-Path -Path $logDirectory)) {
    New-Item -ItemType Directory -Force -Path $logDirectory
}

# Create initial log file
$logFile = "$logDirectory\app.log"
if (!(Test-Path -Path $logFile)) {
    New-Item -ItemType File -Force -Path $logFile
}

# Add initial log entry
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $logFile -Value "$timestamp [info]: ONDC Adapter logging started"

Write-Host "Log directory and initial log file created successfully."