import fs from "fs";
import yaml from "js-yaml";

const squadsPath = "./aios-core/squads";

const squadFolders = fs.readdirSync(squadsPath);

console.log("\n📦 SQUADS COM CÉREBRO:\n");

squadFolders.forEach((folder) => {
  try {
    const squadFilePath = `${squadsPath}/${folder}/squad.yaml`;

    if (!fs.existsSync(squadFilePath)) return;

    const file = fs.readFileSync(squadFilePath, "utf8");
    const squad = yaml.load(file);

    const agents = squad?.components?.agents || [];

    console.log(`\n🧠 ${folder}:`);

    agents.forEach((agentFile) => {
      try {
        const agentPath = `${squadsPath}/${folder}/agents/${agentFile}`;

        if (!fs.existsSync(agentPath)) {
          console.log(`- ${agentFile} (não encontrado)`);
          return;
        }

        const content = fs.readFileSync(agentPath, "utf8");

        console.log(`\n--- ${agentFile} ---`);
        console.log(content.substring(0, 200)); // só preview
      } catch (err) {
        console.log(`Erro ao ler ${agentFile}`);
      }
    });

  } catch (err) {
    console.log(`Erro no squad ${folder}`);
  }
});