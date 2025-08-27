// Re-export the context hook and provider
export { default as useWizardContext } from "./WizardContext";
export { WizardContextProvider } from "./WizardContext";

// Re-export the step<>component map
export { STEP_COMPONENTS } from "./wizardStepMap";

// Re-export the wizard configuration
export * from "./wizardConfig";
