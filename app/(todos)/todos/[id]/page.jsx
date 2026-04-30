import Link from "next/link";
import { notFound } from "next/navigation";

async function getTodo(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/todos/${id}`,
    {
      cache: "no-store",
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Todo를 불러오지 못했습니다.");

  return res.json();
}

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

// 우선순위
const PRIORITY_MAP = {
  high: { label: "높음", style: "bg-red-50 text-red-500" },
  medium: { label: "중간", style: "bg-yellow-50 text-yellow-500" },
  low: { label: "낮음", style: "bg-green-50 text-green-500" },
};

// 카테고리 색상
const COLOR_MAP = {
  blue: "bg-blue-50 text-blue-500",
  green: "bg-green-50 text-green-500",
  purple: "bg-purple-50 text-purple-500",
  red: "bg-red-50 text-red-500",
};

export default async function TodoDetailPage({ params }) {
  const { id } = await params;

  const [todo, categories] = await Promise.all([getTodo(id), getCategories()]);

  // 존재하지 않는 id -> 404
  if (!todo) notFound();

  const category = categories.find((c) => c.id === todo.category);
  const priority = PRIORITY_MAP[todo.priority];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* 뒤로가기 */}
        <Link
          href="/todos"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6 inline-block"
        >
          ← 목록으로
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* 뱃지 영역 */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {/* 완료 여부 */}
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                todo.completed
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {todo.completed ? "✅ 완료" : "⏳ 진행 중"}
            </span>

            {/* 우선순위 */}
            {priority && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${priority.style}`}
              >
                우선순위 {priority.label}
              </span>
            )}

            {/* 카테고리 */}
            {category && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${COLOR_MAP[category.color] ?? "bg-gray-100 text-gray-500"}`}
              >
                {category.name}
              </span>
            )}
          </div>

          {/* 제목 */}
          <h1
            className={`text-2xl font-bold mb-4 ${
              todo.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h1>

          {/* 내용 */}
          <p className="text-gray-600 mb-8">{todo.content}</p>

          {/* 메타 정보 */}
          <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
            <InfoRow label="카테고리" value={category?.name ?? "-"} />
            <InfoRow
              label="우선순위"
              value={priority?.label ?? todo.priority}
            />
            <InfoRow
              label="생성일"
              value={new Date(todo.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <InfoRow label="ID" value={`#${todo.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-20 text-gray-400 flex-shrink-0">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}
