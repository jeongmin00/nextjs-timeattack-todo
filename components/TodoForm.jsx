"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIES = [
  { id: "1", name: "업무" },
  { id: "2", name: "공부" },
  { id: "3", name: "개인" },
  { id: "4", name: "운동" },
];

const PRIORITIES = [
  { value: "high", label: "높음" },
  { value: "medium", label: "중간" },
  { value: "low", label: "낮음" },
];

export default function TodoForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "1",
    priority: "medium",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!form.content.trim()) newErrors.content = "내용을 입력해주세요.";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          completed: false,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("추가 실패");

      router.push("/todos");
      router.refresh(); // 목록 페이지 서버 컴포넌트 재실행
    } catch (err) {
      setErrors({ submit: "Todo 추가에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6"
    >
      {/* 제목 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          제목 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="할 일을 입력하세요"
          className={`border rounded-lg px-4 py-2.5 text-sm outline-none transition-colors ${
            errors.title
              ? "border-red-300 focus:border-red-400"
              : "border-gray-200 focus:border-gray-400"
          }`}
        />
        {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          내용 <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={4}
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="상세 내용을 입력하세요"
          className={`border rounded-lg px-4 py-2.5 text-sm outline-none transition-colors ${
            errors.content
              ? "border-red-300 focus:border-red-400"
              : "border-gray-200 focus:border-gray-400"
          }`}
        />
        {errors.content && (
          <p className="text-xs text-red-400">{errors.content}</p>
        )}
      </div>
      {/* 카테고리 + 우선순위 */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-gray-700">카테고리</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
          >
            {CATEGORIES.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-gray-700">우선순위</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
          >
            {PRIORITIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 서버 에러 */}
      {errors.submit && (
        <p className="text-sm text-red-400 text-center">{errors.submit}</p>
      )}

      {/* 버튼 */}
      <div className="flex gap-3 mt-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-gray-200 text-gray-500 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {loading ? "추가중..." : "추가하기"}
        </button>
      </div>
    </form>
  );
}
