"use client";

import { Page } from "@/components/layout/Page";
import { AwesomeButton } from "@/components/button/AwesomeButton";
import QuickActionButton from "@/components/button/QuickActionButton";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDelayedAction } from "@/hooks/useDelayedAction";
import { PlusIcon, ListBulletIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  status: "pending" | "rejected" | "approved";
  createdAt: Date;
}

export default function QuestionFactoryPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");
  const [loading, setLoading] = useState(false);

  // Form state
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  // Mock questions data
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "پایتخت ایران کدام شهر است؟",
      options: ["تهران", "اصفهان", "شیراز", "مشهد"],
      correctAnswer: 0,
      status: "approved",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2", 
      text: "کدام یک از این زبان‌های برنامه‌نویسی است؟",
      options: ["HTML", "CSS", "JavaScript", "همه موارد"],
      correctAnswer: 2,
      status: "pending",
      createdAt: new Date("2024-01-16")
    },
    {
      id: "3",
      text: "بزرگترین سیاره منظومه شمسی کدام است؟",
      options: ["زمین", "مشتری", "زحل", "مریخ"],
      correctAnswer: 1,
      status: "rejected",
      createdAt: new Date("2024-01-17")
    }
  ]);

  const handleOptionChange = useCallback((index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }, [options]);

  const handleSubmitQuestion = useCallback(async () => {
    if (!questionText.trim() || options.some(opt => !opt.trim()) || correctAnswer === null) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionText,
        options: [...options],
        correctAnswer,
        status: "pending",
        createdAt: new Date()
      };

      setQuestions(prev => [newQuestion, ...prev]);
      
      // Reset form
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(null);
      
      alert("سوال با موفقیت ثبت شد!");
      setActiveTab("list");
    } catch (error) {
      console.error("خطا در ثبت سوال:", error);
      alert("خطا در ثبت سوال");
    } finally {
      setLoading(false);
    }
  }, [questionText, options, correctAnswer]);

  const getStatusIcon = (status: Question["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: Question["status"]) => {
    switch (status) {
      case "approved":
        return "تایید شده";
      case "rejected":
        return "رد شده";
      case "pending":
        return "بررسی نشده";
    }
  };

  const getStatusColor = (status: Question["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
    }
  };

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text font-vazir-matn" dir="rtl">
        {/* Header */}
        <div className="p-4 border-b border-brand-secondary">
          <h1 className="text-2xl font-bold text-center mb-4">کارخانه سوال</h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-2">
            <QuickActionButton
              variant={activeTab === "create" ? "blue" : "gray"}
              onClick={() => setActiveTab("create")}
              className="flex-1"
              icon={<PlusIcon className="w-5 h-5" />}
              label="ثبت سوال"
            />
            
            <QuickActionButton
              variant={activeTab === "list" ? "blue" : "gray"}
              onClick={() => setActiveTab("list")}
              className="flex-1"
              icon={<ListBulletIcon className="w-5 h-5" />}
              label="لیست سوالات"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {activeTab === "create" ? (
            /* Create Question Form */
            <div className="space-y-6">
              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium mb-2">متن سوال</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="متن سوال خود را وارد کنید..."
                  className="w-full p-3 bg-brand-secondary border border-gray-600 rounded-lg text-brand-text placeholder-brand-subtext resize-none"
                  rows={3}
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium mb-2">گزینه‌های پاسخ</label>
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-brand-accent rounded-full text-sm font-bold">
                        {(index + 1).toLocaleString('fa-IR')}
                      </div>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`گزینه ${(index + 1).toLocaleString('fa-IR')}`}
                        className="flex-1 p-3 bg-brand-secondary border border-gray-600 rounded-lg text-brand-text placeholder-brand-subtext"
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                        className="w-5 h-5 text-brand-accent"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-brand-subtext mt-2">
                  دکمه کنار پاسخ صحیح را انتخاب کنید
                </p>
              </div>

              {/* Submit Button */}
              <AwesomeButton
                onClick={handleSubmitQuestion}
                disabled={loading}
                className="w-full"
              >
                {loading ? "در حال ثبت..." : "ثبت سوال"}
              </AwesomeButton>
            </div>
          ) : (
            /* Questions List */
            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-brand-subtext">هیچ سوالی ثبت نشده است</p>
                </div>
              ) : (
                questions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-brand-secondary rounded-lg p-4 border border-gray-600"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-brand-text mb-1">
                          {question.text}
                        </h3>
                        <p className="text-sm text-brand-subtext">
                          {question.createdAt.toLocaleDateString("fa-IR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(question.status)}
                        <span className={`text-sm font-medium ${getStatusColor(question.status)}`}>
                          {getStatusText(question.status)}
                        </span>
                      </div>
                    </div>

                    {/* Question Options */}
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 p-2 rounded ${
                            index === question.correctAnswer
                              ? "bg-green-500/20 border border-green-500/30"
                              : "bg-gray-700/30"
                          }`}
                        >
                          <div className="flex items-center justify-center w-6 h-6 bg-brand-accent rounded-full text-xs font-bold">
                            {(index + 1).toLocaleString('fa-IR')}
                          </div>
                          <span className="text-sm">{option}</span>
                          {index === question.correctAnswer && (
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}