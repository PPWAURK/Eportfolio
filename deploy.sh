#!/bin/bash
set -e

DOMAIN="shihongwang.fr.eu.org"
EMAIL="wangshihong2333@gmail.com"

echo "=== Portfolio SSL Setup ==="
echo "Domain: $DOMAIN"
echo ""

# Step 1: Create data directories
echo "[1] Creating directories..."
mkdir -p data/ssl data/certbot/conf data/videos

# Step 2: Start HTTP-only stack
echo "[2] Starting HTTP stack for cert challenge..."
docker compose up -d

# Step 3: Check if cert already exists
CERT_DIR="data/certbot/conf/live/$DOMAIN"
if [ -f "$CERT_DIR/fullchain.pem" ]; then
  echo "[3] SSL certificate found, skipping certbot."
else
  echo "[3] Obtaining Let's Encrypt certificate..."
  docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"
fi

# Step 4: Copy certs
echo "[4] Copying certificates..."
mkdir -p data/ssl
cp "$CERT_DIR/fullchain.pem" data/ssl/
cp "$CERT_DIR/privkey.pem" data/ssl/

# Step 5: Switch config to SSL
echo "[5] Switching to HTTPS config..."
cp nginx/portfolio.conf nginx/portfolio.http.conf
cp nginx/portfolio.ssl.conf nginx/portfolio.conf

docker compose restart nginx

echo ""
echo "=== Done ==="
echo "Site: https://$DOMAIN"
echo ""
echo "To revert to HTTP only:  cp nginx/portfolio.http.conf nginx/portfolio.conf && docker compose restart nginx"
