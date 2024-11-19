export const ContactMeButton = (props) => {
  return (
    <button className="bg-gray-600 text-white rounded-md p-2 hover:bg-gray-500">
      {props.children}
    </button>
  );
};
