![Cover](./.github/assets/fluentci-studio.png)

# FluentCI Studio

[![build](https://github.com/fluentci-io/fluentci-studio/actions/workflows/release.yml/badge.svg)](https://github.com/fluentci-io/fluentci-studio/actions/workflows/release.yml)

FluentCI Studio is a new way for you to explore CI pipelines on FluentCI projects.

## Usage

Run the following command to start FluentCI Studio:

```bash
deno run -A https://cli.fluentci.io studio
```

## Building

Run the following command to build FluentCI Studio:

```bash
cd webui && bun install && bun run build && cd ..
cargo build --release
```

## Downloads

- `Mac`: arm64: [fluentci-studio_v0.1.0_arm64.dmg](https://github.com/fluentci-io/fluentci-studio/releases/download/v0.1.0/fluentci-studio_v0.1.0_arm64.dmg) intel: [fluentci-studio_v0.1.0_x64.dmg](https://github.com/fluentci-io/fluentci-studio/releases/download/v0.1.0/fluentci-studio_v0.1.0_x64.dmg)
- `Linux`: [fluentci-studio_v0.1.0.AppImage](https://github.com/fluentci-io/fluentci-studio/releases/download/v0.1.0/fluentci-studio_v0.1.0.AppImage)
