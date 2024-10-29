import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { ShowType } from "../types/index";
import PublicTagSelect from "./select-public-tags";

interface TagSectionProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  tagInput: string;
  setTagInput: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  setValue: UseFormSetValue<ShowType>;
}

export default function TagSection({
  register,
  errors,
  tagInput,
  setTagInput,
  selectedTags,
  setSelectedTags,
  setValue,
}: TagSectionProps) {
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
    <>
      <PublicTagSelect
        register={register}
        setValue={setValue}
        error={errors.publicTag?.message}
        name="publicTag"
      />

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
          {selectedTags.map((tag) => (
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
    </>
  );
}
