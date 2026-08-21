const minecraftStatus = document.getElementById("minecraft-status");
const overallStatus = document.getElementById("overall-status");
const overallTitle = document.getElementById("overall-title");
const overallLabel = document.getElementById("overall-label");
const lastChecked = document.getElementById("last-checked");

const API_URL =
  "https://api.mcstatus.io/v2/status/java/mc.robholdings.com";

async function checkMinecraft() {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.online) {
      setMinecraftStatus(true);
    } else {
      setMinecraftStatus(false);
    }

    updateLastChecked();
  } catch (error) {
    console.error("Minecraft status check failed:", error);
    setMinecraftStatus(false);
    updateLastChecked();
  }
}

function setMinecraftStatus(online) {
  minecraftStatus.classList.remove(
    "status-pending",
    "status-operational",
    "status-offline"
  );

  overallStatus.classList.remove(
    "status-pending",
    "status-operational",
    "status-offline"
  );

  if (online) {
    minecraftStatus.classList.add("status-operational");
    minecraftStatus.querySelector("span:last-child").textContent =
      "Operational";

    overallStatus.classList.add("status-operational");
    overallTitle.textContent = "All Systems Operational";
    overallLabel.textContent = "Operational";
  } else {
    minecraftStatus.classList.add("status-offline");
    minecraftStatus.querySelector("span:last-child").textContent =
      "Offline";

    overallStatus.classList.add("status-offline");
    overallTitle.textContent = "Service Disruption";
    overallLabel.textContent = "Offline";
  }
}

function updateLastChecked() {
  const now = new Date();

  lastChecked.textContent =
    "Last checked " +
    now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });
}

checkMinecraft();

setInterval(checkMinecraft, 60000);
