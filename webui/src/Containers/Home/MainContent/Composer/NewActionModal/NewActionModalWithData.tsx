import { FC, useEffect, useState } from "react";
import NewActionModal from "./NewActionModal";

const BASE_URL = "https://api.fluentci.io/v1";
const filters = [
  "bazel_pipeline",
  "buf_pipeline",
  "atlas_pipeline",
  "terraform_pipeline",
  "deno_pipeline",
  "android_pipeline",
  "fastlane_pipeline",
  "elixir_pipeline",
  "symfony_pipeline",
  "laravel_pipeline",
  "ruby_pipeline",
  "django_pipeline",
  "gradle_pipeline",
  "dotnet_pipeline",
  "bun_pipeline",
  "nodejs_pipeline",
  "gleam_pipeline",
  "php_pipeline",
  "python_pipeline",
  "swift_pipeline",
  "rust_pipeline",
  "go_pipeline",
  "zig_pipeline",
  "flutter_pipeline",
  "heroku_pipeline",
  "codecov_pipeline",
  "cloudflare_pipeline",
  "render_pipeline",
  "fly_pipeline",
  "netlify_pipeline",
  "shuttle_pipeline",
  "railway_pipeline",
  "chromatic_pipeline",
  "spin_pipeline",
  "clojure_pipeline",
  "sonar_pipeline",
  "drizzlekit_pipeline",
  "prisma_pipeline",
  "terragrunt_pipeline",
  "pulumi_pipeline",
  "wiremock_pipeline",
  "trivy_pipeline",
  "snyk_pipeline",
  "grype_pipeline",
  "syft_pipeline",
  "github_pipeline",
  "gitlab_pipeline",
  "firebase_pipeline",
  "supabase_pipeline",
  "aws_sls_pipeline",
  "wasmer_pipeline",
  "terraform_docs_pipeline",
  "gitleaks_pipeline",
  "microcks_pipeline",
  "flakestry_pipeline",
  "scorecard_pipeline",
  "conftest_pipeline",
];

export type Pipeline = {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  logo: string;
  packageId: string;
  downloads: number;
  version: string;
  license: string;
  defaultBranch: string;
  updatedAt: string;
  comingSoon: boolean;
};

type NewActionModalWithDataProps = {
  onClose: () => void;
  onAdd: (item: Pipeline) => void;
  isOpen: boolean;
};

const NewActionModalWithData: FC<NewActionModalWithDataProps> = (props) => {
  const [pipelines, setPipelines] = useState<{ all: Pipeline[] }>();
  useEffect(() => {
    fetch(`${BASE_URL}/pipelines?q=${filters.join(",")}`)
      .then((res) => res.json())
      .then((data) =>
        setPipelines({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          all: data.map((x: any) => ({
            id: x.id,
            name: x.name,
            description: x.description,
            githubUrl: x.github_url,
            logo: x.logo_url,
            packageId: x.name,
            downloads: x.downloads,
            version: x.version,
            license: x.license,
            defaultBranch: x.default_branch,
            updatedAt: x.updatedAt,
            comingSoon: false,
          })),
        })
      )
      .catch((err) => console.log(err));
  }, [setPipelines]);

  return <NewActionModal pipelines={pipelines} {...props} />;
};

export default NewActionModalWithData;
