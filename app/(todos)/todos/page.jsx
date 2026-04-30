import Link from "next/link";
import TodoCard from "../../../components/TodoCard";
import { Suspense } from "react";
import TodoFilterBar from "../../../components/TodoFilterBar";

export const metadata = {
  title: "Todo 목록",
  description: "전체 Todo 조회 가능합니다.",
};

async function getTodos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function TodosPage({ searchParams }) {
  const { completed } = await searchParams;
  const allTodos = await getTodos();

  const todos =
    completed === "true"
      ? allTodos.filter((t) => t.completed === true)
      : completed === "false"
        ? allTodos.filter((t) => t.completed === false)
        : allTodos;

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Todo 목록</h1>
            <p className="text-sm text-gray-400 mt-1">총 {todos.length}개</p>
          </div>
          <Link
            href="/todos/new"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-1g hover:bg-gray-700 transition-colors"
          >
            + 새 Todo
          </Link>
        </div>

        {/* 필터 버튼 */}
        <div className="mb-6">
          <Suspense fallback={<div className="h-8" />}>
            <TodoFilterBar />
          </Suspense>
        </div>

        {/* Todo 목록 */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 py-20">할 일이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
