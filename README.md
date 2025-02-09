docker buildx build --no-cache --platform linux/amd64 -t asd2321s2/cyberlogitec-punch:latest .
docker tag asd2321s2/cyberlogitec-punch:latest asd2321s2/cyberlogitec-punch:latest
docker push asd2321s2/cyberlogitec-punch:latest
docker pull asd2321s2/cyberlogitec-punch:latest
docker run -d -p 6235:3000 --name cyberlogitec-punch-container asd2321s2/cyberlogitec-punch:latest

docker run -d --name github-runner   --restart unless-stopped   -e REPO_URL="https://github.com/ocean-network-express/om-pom-test-rate-api"   -e RUNNER_TOKEN="BN5FKTW5YYHXOPBFFKK53V3HUREOE"   -e RUNNER_NAME="pom-fe-runner"   -e RUNNER_WORKDIR="/tmp/github-runner"   -e LABELS="self-hosted,linux,x64"   -v /var/run/docker.sock:/var/run/docker.sock   myoung34/github-runner:latest