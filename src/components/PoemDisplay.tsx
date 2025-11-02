import { Poem } from '../lib/supabase';

interface PoemDisplayProps {
  poem: Poem;
}

export function PoemDisplay({ poem }: PoemDisplayProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12" dir="rtl">
      <article className="prose prose-invert max-w-none">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 font-serif">
          {poem.title}
        </h1>

        <div className="space-y-2 mb-12 text-slate-400 text-sm">
          <p>{poem.melody}</p>
          <p>{poem.tune}</p>
        </div>

        <div className="mt-16 space-y-8">
          {poem.content.split('\n\n').map((stanza, index) => (
            <div
              key={index}
              className="space-y-3 text-lg md:text-xl leading-relaxed text-slate-200"
            >
              {stanza.split('\n').map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className="leading-relaxed tracking-wide"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
