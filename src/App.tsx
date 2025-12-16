import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';
import { FilterProvider } from './context/FilterContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <FilterProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </FilterProvider>
  );
}

export default App;
