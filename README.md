# Youl TCG Showcase

Static showcase website for the **Youl Trading Card Game**: an interactive gallery of YTCG cards (Cyberpunk, Magic / Fantasy and KDA extensions) with holographic 3D tilt/shine effects rendered in pure CSS/JS.

Live at [ytcg.barlito.fr](https://ytcg.barlito.fr).

## Stack

- Plain HTML/CSS/JS, no build step (anime.js vendored in `js/lib`)
- Served by nginx (`webdevops/php-nginx-dev`) behind [traefik-base](https://github.com/barlito/traefik-base) on Docker Swarm

## Run locally

```bash
make deploy    # dev stack -> https://ytcg.local.barlito.fr
make deploy-prod    # prod stack (Let's Encrypt TLS)
make undeploy
```

Requires Docker Swarm with the `traefik_traefik_proxy` network already up.

## Related repos

- [youl-tcg](https://github.com/barlito/youl-tcg) — main game backend
- [ytcg-game-client](https://github.com/barlito/ytcg-game-client) — game client
