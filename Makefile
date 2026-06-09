stack_name=youl_tcg_showcase
prod_host=ytcg.barlito.fr

# Container
app_container_id = $(shell docker ps --filter name="$(stack_name)_nginx" -q)

.PHONY: bash
bash:
	docker exec -it -u root $(app_container_id) sh

.PHONY: logs
logs:
	docker service logs -f $(stack_name)_nginx

.PHONY: deploy
deploy:
	docker compose build
	docker stack deploy -c docker-compose.yml $(stack_name)

.PHONY: deploy.prod
deploy.prod:
	docker stack deploy -c docker-compose-prod.yml $(stack_name)
	make smoke.test

.PHONY: undeploy
undeploy:
	docker stack rm $(stack_name)

.PHONY: smoke.test
smoke.test:
	@echo "🩺 Smoke test https://$(prod_host)/..."
	@curl -fsS -o /dev/null -w "  HTTP %{http_code}\n" https://$(prod_host)/ || (echo "❌ Smoke test KO" && exit 1)
	@echo "✓ Smoke test OK"
