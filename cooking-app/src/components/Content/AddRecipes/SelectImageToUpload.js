export const SelectImageToUpload = ({ onChange, onClick, text }) => {
  return (
    <>
      <h3> {text}</h3>
      <input name="file" type="file" onChange={onChange} />
      <button onClick={onClick}>Add Photo</button>
    </>
  );
};
