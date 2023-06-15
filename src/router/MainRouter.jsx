import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import { MainLayout } from "layouts";

import NotFoundPage from "pages/404/NotFoundPage";
import LandingPage from "pages/landing/LandingPage";
import SigInPage from "pages/auth/SignInPage";
import SignUpPage from "pages/auth/SignUpPage";

import HomePage from "pages/home/HomePage";
import QuizPage from "pages/quiz/QuizPage";
import ResultsPage from "pages/results/ResultsPage";
import HistoryPage from "pages/history/HistoryPage";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="/quiz" element={<Outlet />}>
            <Route index element={<HomePage />} />
            <Route path="questions" element={<QuizPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path=":paramId" element={<ResultsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
