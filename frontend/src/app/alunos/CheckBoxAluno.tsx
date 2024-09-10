
type Props = {
  paymentTypes: string[];
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBoxAluno({
  paymentTypes,
  handleCheckboxChange,
}: Props) {
  return (
    <>
      <div className="flex gap-10">
        {paymentTypes.map((payment) => (
          <label key={payment} className="flex gap-2">
            <input
              type="checkbox"
              name={payment}
              onChange={handleCheckboxChange}
            />
            <p>{payment}</p>
          </label>
        ))}
      </div>
    </>
  );
}
