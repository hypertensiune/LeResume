export function saveResumeToLocalStorage(resume: Resume) {
  localStorage.setItem("resume", JSON.stringify(resume));
}

export function getResumeFromLocalStorage() {
  return JSON.parse(localStorage.getItem("resume") || "") as Resume;
}

export function deleteResumeFromLocalStorage() {
  localStorage.removeItem("resume");
}

export function clearLocalStorage() {
  localStorage.clear();
}