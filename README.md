docker buildx build --no-cache --platform linux/amd64 -t asd2321s2/cyberlogitec-punch:latest .
docker tag asd2321s2/cyberlogitec-punch:latest asd2321s2/cyberlogitec-punch:latest
docker push asd2321s2/cyberlogitec-punch:latest
docker run -d -p 6235:3000 --name cyberlogitec-punch-container asd2321s2/cyberlogitec-punch:latest