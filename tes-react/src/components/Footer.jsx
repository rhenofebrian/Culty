import { ContactMeButton } from "./ContactMeButton";

export const Footer = () => {
  return (
    <footer className="min-h-16  py-8 border-t flex items-center justify-between px-20 mt-10">
      <p>RhenCode Copyright 2024</p>
      <ContactMeButton>Contact Us</ContactMeButton>
    </footer>
  );
};
