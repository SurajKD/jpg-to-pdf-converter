
export const trackButton = (name: string) => {
    //@ts-ignore
  if (typeof window !== "undefined" && window.gtag) {
     //@ts-ignore
    window.gtag("event", "button_click", {
      event_category: "engagement",
      button_name: name,
    });

  }
};