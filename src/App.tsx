import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { poems, Poem } from './data/poems';
import { PoemDisplay } from './components/PoemDisplay';

interface PoemWithIndex {
  poem: Poem;
  index: number;
  total: number;
}

function App() {
  const [poemData, setPoemData] = useState<PoemWithIndex | null>(null);
  const [loading, setLoading] = useState(true);

  const getTodayPoem = () => {
    try {
      setLoading(true);

      if (poems.length === 0) {
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const dayNumber = Math.floor(
        (new Date(today).getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)
      );

      const poemIndex = dayNumber % poems.length;
      setPoemData({
        poem: poems[poemIndex],
        index: poemIndex + 1,
        total: poems.length,
      });
    } catch (err) {
      console.error('Error loading poem:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigatePoem = (direction: 'next' | 'prev') => {
    if (!poemData || poems.length === 0) return;

    let newIndex = poemData.index - 1;
    if (direction === 'next') {
      newIndex = (newIndex + 1) % poems.length;
    } else {
      newIndex = (newIndex - 1 + poems.length) % poems.length;
    }

    setPoemData({
      poem: poems[newIndex],
      index: newIndex + 1,
      total: poems.length,
    });
  };

  useEffect(() => {
    getTodayPoem();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-2 w-48 bg-slate-700 rounded mx-auto"></div>
            <div className="h-2 w-32 bg-slate-700 rounded mx-auto"></div>
          </div>
          <p className="mt-8 text-slate-400" dir="rtl">טוען שיר היום...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto">
        <div className="flex justify-between items-center pt-6 px-4 md:px-0">
          <button
            onClick={() => navigatePoem('prev')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            dir="rtl"
            aria-label="שיר קודם"
          >
            <ChevronRight size={24} />
          </button>

          {poemData && (
            <div className="text-center text-sm text-slate-500" dir="rtl">
              <span>{poemData.index} / {poemData.total}</span>
            </div>
          )}

          <button
            onClick={() => navigatePoem('next')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            dir="rtl"
            aria-label="שיר הבא"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {poemData && (
          <div className="mt-4">
            <PoemDisplay poem={poemData.poem} />
          </div>
        )}
      </div>

      <footer className="text-center py-12 text-slate-600 text-sm" dir="rtl">
        <p className="mb-1">שירי יהודה עמיחי</p>
        <p className="text-xs">שיר אחד כל יום</p>
      </footer>
    </div>
  );
}

export default App;
