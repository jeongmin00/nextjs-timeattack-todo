import Link from "next/link";

export default function TodoCard({ todo }) {
  return (
    <Link
      href={`/todos/${todo.id}`}
      className="blcok bg-white border border-gray-100 rounded-x1 px-5 py-4 shadow-sm hover:shadow-md transition-shadow no-underline"
    >
      <div className="flex items-start justify-between gap-4">
        {/* 완료 여부 + 제목  */}
        <div className="flex items-center gap-3">
          <span className="text-lg">{todo.completed ? "V" : "X"}</span>
          <div>
            <p
              className={`font-medium text-gray-900 ${todo.completed ? "line-through text-gray-400" : ""}`}
            >
              {todo.title}
            </p>
            {/* 카테고리 */}
            {todo.category && (
              <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {todo.category}
              </span>
            )}
          </div>
        </div>

        {/* 상태 뱃지 */}
        <span
          className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            todo.completed
              ? "bg-green-50 text-green-600"
              : "bg-yellow-50 text-yellow-600"
          }`}
        >
          {todo.completed ? "완료" : "진행 중"}
        </span>
      </div>
    </Link>
  );
}
