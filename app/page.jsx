import Link from "next/link";

export const metadata = {
  title: "홈",
  description: "Todo App 홈페이지입니다.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Todo App</h1>
          <p className="text-lg text-gray-500">
            할 일을 추가하고, 목표를 달성하세요!
          </p>
        </section>

        {/* 카드 목록 */}
        <section className="mb-12">
          <ul className="flex flex-col gap-4">
            {[
              { title: "목록 조회", desc: "등록된 Todo 조회" },
              { title: "Todo 추가", desc: "새로운 할 일 등록" },
              { title: "완료 토글", desc: "클릭으로 완료/미완료 처리" },
              { title: "필터링", desc: "완료/미완료 필터링" },
            ].map(({ title, desc }) => (
              <li
                key={title}
                className="flex item-center gap-4 bg-white border border-gray-100 rounded-x1 px-5 py-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">{title}</p>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Link로 새로고침 없이 이동 */}
        <div className="flex gap-3">
          <Link
            href="/todos"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-color"
          >
            Todo 목록 보기 →
          </Link>
          <Link
            href="/todos/new"
            className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-color"
          >
            + 새 Todo 추가
          </Link>
        </div>
        
      </div>
    </div>
  );
}
