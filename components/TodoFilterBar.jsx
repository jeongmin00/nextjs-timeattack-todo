"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TodoFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("completed"); // true || false || null

  function handleFilter(value) {
    if (value === null) {
      router.push("/todos");
    } else {
      router.push(`/todos?completed=${value}`);
    }
  }

  const buttons = [
    { label: "전체", value: null },
    { label: "진행중", value: "false" },
    { label: "완료", value: "true" },
  ];

  return (
    <div className="flex gap-2">
      {buttons.map(({ label, value }) => {
        const isActive = current === value;
        return (
          <button
            key={label}
            onClick={() => handleFilter(value)}
            className={`text-sm px-4 py-2 rounded-full border transition-colors ${
              isActive
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
