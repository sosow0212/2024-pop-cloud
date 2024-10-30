"use client";

import { memo } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { ShowType } from "../types/index";

interface CustomTagInputProps {
  tagInput: string;
  setTagInput: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  setValue: UseFormSetValue<ShowType>;
  control: Control<ShowType>;
}

function CustomTagInputComponent({
  tagInput,
  setTagInput,
  selectedTags,
  setSelectedTags,
  setValue,
  control,
}: CustomTagInputProps): JSX.Element {
  const tags = useWatch({
    control,
    name: "tags",
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!selectedTags.includes(tagInput.trim())) {
        const newTags = [...selectedTags, tagInput.trim()];
        setSelectedTags(newTags);
        setValue("tags", newTags);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <div className="w-full md:w-full lg:w-full">
      <label htmlFor="tag" className="mb-5 block text-16-600">
        태그
      </label>
      <input
        id="tag"
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="태그를 입력하고 Enter를 누르세요"
        className="flex h-58 w-full items-start gap-10 rounded-6 border bg-white p-16"
      />
      <div className="mt-5 flex flex-wrap gap-5">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-blue-100 px-8 py-4 text-16-400 text-blue-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-blue-800 hover:text-blue-900"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

const CustomTagInput = memo(CustomTagInputComponent);
CustomTagInput.displayName = "CustomTagInput";

export default CustomTagInput;
