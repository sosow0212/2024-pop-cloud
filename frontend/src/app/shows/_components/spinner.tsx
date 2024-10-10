export default function CustomSpinner(): React.ReactElement {
  return (
    <div className="mb-15 flex items-center justify-center py-8">
      <div className="size-20 animate-spin rounded-full border-4 border-solid border-blue-6 border-t-transparent" />
    </div>
  );
}
