import TodoForm from "../../../components/TodoFrom";

export const metadata = {
  title: "새 Todo 추가",
  description: "새로운 할 일을 추가하세요.",
};

export default function NewTodoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">새 Todo 추가</h1>
        <TodoForm />
      </div>
    </div>
  );
}
