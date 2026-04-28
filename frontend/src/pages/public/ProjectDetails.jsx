import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicService } from '../../services/publicService';
import { portfolio as fallbackPortfolio } from '../../data/siteData';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallbackProject = useMemo(
    () => fallbackPortfolio.find((_, idx) => String(idx + 1) === id),
    [id]
  );

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await publicService.getProjectById(id);
        setProject(response.data);
      } catch (err) {
        if (fallbackProject) {
          setProject({
            _id: id,
            title: fallbackProject.title,
            description: fallbackProject.description,
            techStack: fallbackProject.tech || [],
            imageUrl: '',
            sampleImages: [],
            type: 'Sample',
          });
        } else {
          setError(err.response?.data?.message || 'Project details not found');
        }
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, fallbackProject]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-primary text-white pt-28 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-rose-400">{error || 'Project not found'}</p>
          <Link to="/#portfolio" className="text-indigo mt-4 inline-block">Back to Project Samples</Link>
        </div>
      </div>
    );
  }

  const samples = [
    ...(project.imageUrl ? [{ heading: 'Main Sample Output', url: project.imageUrl }] : []),
    ...((project.sampleImages || []).map((item, idx) =>
      typeof item === 'string'
        ? { heading: `Sample Output ${idx + 1}`, url: item }
        : { heading: item.heading || `Sample Output ${idx + 1}`, url: item.url }
    )),
  ].filter((item) => item.url);

  return (
    <section className="pt-28 pb-24 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/#portfolio" className="text-indigo text-sm font-bold hover:text-white transition-all">
          ← Back to Project Samples
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-3">{project.title}</h1>
        <p className="text-muted max-w-3xl">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-5 mb-10">
          {(project.techStack || []).map((t) => (
            <span key={t} className="text-[10px] font-bold text-white bg-indigo/40 border border-white/10 px-2 py-1 rounded uppercase">
              {t}
            </span>
          ))}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">More Sample Outputs</h2>
        {samples.length === 0 ? (
          <div className="glass-card p-8 text-muted">No sample outputs uploaded yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((sample, idx) => (
              <div key={`${sample.url}-${idx}`} className="glass-card overflow-hidden border border-white/10">
                <img src={sample.url} alt={`${project.title} sample ${idx + 1}`} className="w-full h-56 object-cover" />
                <div className="p-3 border-t border-white/10 bg-[#0a1024]">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{sample.heading}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
