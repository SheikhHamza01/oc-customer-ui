/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Inter-Light", "sans-serif"],
        Inter: ["Inter-Regular", "sans-serif"],
      },
      backgroundImage: {
        "color-name-light":
          "linear-gradient(130.53deg, #04CAB5 1.09%, #0E6387 171.24%)",
        "color-name-dark": "linear-gradient(90deg, #04CAB5, #0E6387)",

        "color-application-light" : "linear-gradient(135deg, #00CCB4 9.17%, #00C2C0 100%)",
        "color-application-dark" : "linear-gradient(90deg, #04CAB5, #0E6387)",

        
         "color-card-gradient-light": "linear-gradient(130.53deg, #0072A1 1.09%, #45E4F1 171.24%)",
         "color-card-gradient-dark": "linear-gradient(90deg, #04CAB5, #0E6387)",
      },

      backgroundColor: {
        "theme-light": "#F4F5F9",
        "theme-dark": "#0c2138",

        "color-inputField-light": "#FFFFFF",
        "color-inputField-dark": "#003355",

        "color-createAccountButton-light": "#04CAB5",
        "color-createAccountButton-dark": "#FFFFFF",

        "color-accountCard-light": "#FFFFFF",
        "color-accountCard-dark": "#003355",

        "color-tableHeader-light": "#0072A1B2",
        "color-tableHeader-dark": "#0E6387",

        "color-tableBody-light": "#E9F6FF",
        "color-tableBody-dark": "#003355",

        "color-draftAccount-light": "#BDD687",
        "color-draftAccount-dark": "#1E3A4E",

        "color-progressBar-light": "#EDEDED",
        "color-progressBar-dark": "#003355",

        "color-active-progressBar-light": "#BDD687",
        "color-active-progressBar-dark": "#04CAB5",

        "color-warning-notification-light": "#FD47651A",
        "color-warning-notification-dark": "#4E4E4E",

        "color-header-light": "#FCFCFC",
        "color-header-dark": "#003355",

        "color-sidebar-light": "#0072A1",
        "color-sidebar-dark": "#003355",

        "color-active-sidebarItem-light": "#0382B7",
        "color-active-sidebarItem-dark": "#002D44",

        "color-stepper-light": "#ffffff",
        "color-stepper-dark": "#04CAB5",

        "color-stepper-inactive-light": "#0072A14D",
        "color-stepper-inactive-dark": "#003355",

        "color-stepper-completed-light": "#04CAB5",
        "color-stepper-completed-dark": "#04CAB5",

        "color-selected-light": "#04CAB51A",
        "color-selected-dark": "#04CAB5",

        "color-info-text-light": "#BDD68733",
        "color-info-text-dark": "",

        "color-input-field-light": "#E9F6FF",
         "color-input-field-dark": "",


      },
      textColor: {
        "color-light": "#16587B",
        "color-dark": "#FFFFFF",

        "color-muted-light": "#003355",
        "color-muted-dark": "#A9A9A9",

        "color-icon-light": "#003355B2",
        "color-icon-dark": "#A9A9A9",

        "color-filterIcon-light": "#0072A1",
        "color-filterIcon-dark": "#FFFFFF",

        "color-createAccountButton-light": "#FFFFFF",
        "color-createAccountButton-dark": "#003355",

        "color-activeAccounts-light": "#04CAB5",
        "color-activeAccounts-dark": "#04CAB5",

        "color-draftAccounts-light": "#BDD687",
        "color-draftAccounts-dark": "#A9A9A9",

        "color-pendingAccounts-light": "#FD4765",
        "color-pendingAccounts-dark": "#FFA800",

        "color-accountType-light": "#0E6387",
        "color-accountType-dark": "#FFFFFF",

        "color-tableHeader-light": "#FFFFFF",
        "color-tableHeader-dark": "#FFFFFF",

        "color-edit-icon-light": "#4279F1",
        "color-edit-icon-dark": "#A9A9A9",

        "color-switchIcon-light": "#A888E4",
        "color-switchIcon-dark": "#A9A9A9",

        "color-deleteIcon-light": "#FD667F",
        "color-deleteIcon-dark": "#FFA800",

        "color-eyeIcon-light": "#0072A1",
        "color-eyeIcon-dark": "#A9A9A9",

        "color-transferIcon-light": "#01C6BB",
        "color-transferIcon-dark": "#04CAB5",

        "color-alertIcon-light": "#FF7272",
        "color-alertIcon-dark": "#FF4D6D",

        "color-sidebarText-light": "#F5FBFF",
        "color-sidebarText-dark": "#A9A9A9",

        "color-buttonText-light": "#04CAB5",
        "color-buttonText-dark": "#003355",

      "color-stepper-active-light": "#0072A1",
      "color-stepper-active-dark": "#003355",

       "color-stepper-inactive-light": "#ffffff",
      "color-stepper-inactive-dark": "#003355",

      "color-stepper-inactivelabel-light": "#0072A180",
      "color-stepper-inactivelabel-dark": "#04CAB5",

      "color-stepper-completed-light": "#04CAB5",
      "color-stepper-completed-dark": "#003355",

      "color-info-text-light": "#BDD687",
      "color-info-text-dark": "",
      },
      borderColor: {
        "color-light": "#0072A1",
        "color-dark": "#FFFFFF",

        "color-button-light": "#04CAB5",
        "color-button-dark": "#04CAB5",

        "color-stepperActive-light": "#0072A1",
        "color-stepperActive-dark": "#04CAB5",

        "color-selected-light": "#04CAB5",
        "color-selected-dark": "#04CAB5",

        "color-steps-incomplete-light": "#FD4765",
        "color-steps-incomplete-dark": "#FD4765",
      },
      placeholderColor: {
        "color-light": "#003355",
        "color-dark": "#A9A9A9",
      },

      screens: {
        xl: {
          max: "4000px",
        },
        lg: {
          max: "1200px",
        },
        mq1350: {
          raw: "screen and (max-width: 1350px)",
        },
        mq1125: {
          raw: "screen and (max-width: 1125px)",
        },
        mq1050: {
          raw: "screen and (max-width: 1050px)",
        },
        mq975: {
          raw: "screen and (max-width: 975px)",
        },
        mq920: {
          raw: "screen and (max-width: 920px)",
        },
        mq800: {
          raw: "screen and (max-width: 800px)",
        },
        mq750: {
          raw: "screen and (max-width: 750px)",
        },
        mq700: {
          raw: "screen and (max-width: 700px)",
        },
        mq450: {
          raw: "screen and (max-width: 450px)",
        },
      },
    },
    corePlugins: {
      preflight: true,
    },
  },
  safelist: [
    {
      pattern: /bg-theme-(light|dark)/,
    },
    {
      pattern: /bg-color-inputField-(light|dark)/,
    },
    {
      pattern: /bg-color-createAccountButton-(light|dark)/,
    },
    {
      pattern: /bg-color-accountCard-(light|dark)/,
    },
    {
      pattern: /bg-color-tableHeader-(light|dark)/,
    },
    {
      pattern: /bg-color-tableBody-(light|dark)/,
    },
    {
      pattern: /bg-color-name-(light|dark)/, //
    },
    {
      pattern: /bg-color-draftAccount-(light|dark)/, //
    },
    {
      pattern: /bg-color-progressBar-(light|dark)/, //
    },
    {
      pattern: /bg-color-active-progressBar-(light|dark)/, //
    },
    {
      pattern: /bg-color-warning-notification-(light|dark)/, //
    },
    {
      pattern: /bg-color-header-(light|dark)/, //
    },
    {
      pattern: /bg-color-sidebar-(light|dark)/, //
    },
    {
      pattern: /bg-color-active-sidebarItem-(light|dark)/, //
    },
    { 
      pattern: /bg-color-stepper-(light|dark)/, //
    },
    {
      pattern: /bg-color-stepper-inactive-(light|dark)/, //
    },
    {
      pattern: /bg-color-stepper-completed-(light|dark)/, //    
    },
    {
      pattern: /bg-color-application-(light|dark)/, //
    },
    { 
      pattern: /bg-color-selected-(light|dark)/, //
    },
    {
      pattern: /bg-color-info-text-(light|dark)/, //
    },
    {
      pattern: /bg-color-input-field-(light|dark)/,
    },
    {
      pattern: /bg-color-card-gradient-(light|dark)/,
    },

    //for text colors
    {
      pattern: /text-color-(light|dark)/,
    },
    {
      pattern: /text-color-muted-(light|dark)/,
    },
    {
      pattern: /text-color-icon-(light|dark)/,
    },
    {
      pattern: /text-color-filterIcon-(light|dark)/,
    },
    {
      pattern: /text-color-createAccountButton-(light|dark)/,
    },
    {
      pattern: /text-color-activeAccounts-(light|dark)/,
    },
    {
      pattern: /text-color-draftAccounts-(light|dark)/,
    },
    {
      pattern: /text-color-pendingAccounts-(light|dark)/,
    },
    {
      pattern: /text-color-accountType-(light|dark)/,
    },
    {
      pattern: /text-color-tableHeader-(light|dark)/,
    },
    {
      pattern: /text-color-edit-icon-(light|dark)/,
    },
    {
      pattern: /text-color-switchIcon-(light|dark)/,
    },
    {
      pattern: /text-color-deleteIcon-(light|dark)/,
    },
    {
      pattern: /text-color-eyeIcon-(light|dark)/,
    },
    {
      pattern: /text-color-transferIcon-(light|dark)/,
    },
    {
      pattern: /text-color-alertIcon-(light|dark)/,
    },
    {
      pattern: /text-color-sidebarText-(light|dark)/,
    },
    {
      pattern: /text-color-buttonText-(light|dark)/,
    },
    {
      pattern: /text-color-stepper-active-(light|dark)/,
    },
    {
      pattern: /text-color-stepper-inactive-(light|dark)/,
    },
    {
      pattern: /text-color-stepper-inactivelabel-(light|dark)/,
    },
    {
      pattern: /text-color-stepper-completed-(light|dark)/,
    },
    {
      pattern: /text-color-info-text-(light|dark)/,
    },
    //placeholder colors
    {
      pattern: /placeholder-color-(light|dark)/,
    },
    //for border colors
    {
      pattern: /border-color-(light|dark)/,
    },
    {
      pattern: /border-color-button-(light|dark)/,
    },
    {
      pattern: /border-color-stepperActive-(light|dark)/,
    },
    {
      pattern: /border-color-selected-(light|dark)/,
    },
    {
      pattern: /border-color-steps-incomplete-(light|dark)/,
    },
    //for accordion active state
    {
      pattern: /bg-color-subaccordion-active-(SC|lightTheme|Ascent)/, // Hover text color
      variants: ["hover"],
    },
  ],
  plugins: [require("tailwindcss-animate")],
};
