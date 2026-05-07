import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "홈",
  description: "할 일을 간편하게 관리하는 Todo 앱입니다.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="max-w-2xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        {/* 히어로 이미지 */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"
            alt="할 일 목록을 정리하는 모습"
            width={800}
            height={400}
            className="object-cover w-full"
            priority // 빠르게 로딩
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">✅ Todo App</h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-10">
          할 일을 추가하고, 완료하고, 한눈에 확인하세요!
        </p>

        <div className="flex gap-3">
          <Link
            href="/todos"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Todo 목록 보기 →
          </Link>
          <Link
            href="/todos/new"
            className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            + 새 Todo 추가
          </Link>
        </div>
      </section>
    </div>
  );
}
