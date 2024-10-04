import type { Meta, StoryObj } from "@storybook/react";

import useToastStore from "@/store/use-toast-store";

import Toast from ".";

function ToastButtons() {
  const { showToast } = useToastStore();

  return (
    <div className="mt-100 flex items-center justify-center gap-4 p-10">
      <button
        type="button"
        className="block h-30 w-100 rounded-md bg-blue-500 text-white shadow-md"
        onClick={() => {
          showToast({ type: "info", content: "information toast" });
        }}
      >
        Info
      </button>
      <button
        type="button"
        className="block h-30 w-100 rounded-md bg-green-500 text-white shadow-md"
        onClick={() => {
          showToast({
            type: "success",
            content: "success toast",
          });
        }}
      >
        Success
      </button>
      <button
        type="button"
        className="block h-30 w-100 rounded-md bg-yellow-500 text-white shadow-md"
        onClick={() => {
          showToast({ type: "warn", content: "warn toast" });
        }}
      >
        Warn
      </button>
      <button
        type="button"
        className="block h-30 w-100 rounded-md bg-red-500 text-white shadow-md"
        onClick={() => {
          showToast({ type: "error", content: "danger toast" });
        }}
      >
        danger
      </button>
    </div>
  );
}

const meta = {
  title: "Components/Toast",
  component: Toast,
} as Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Toaster: Story = {
  render: () => (
    <>
      <Toast />
      <ToastButtons />
    </>
  ),
};
