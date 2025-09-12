"use client";

import React, { useState } from 'react';
import { Search, User, Clock, Eye, Globe, Hash, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

interface ReelData {
  url: string;
  caption: string;
  transcript: string;
  author: string;
  hashtags: string[];
  duration: string;
  language: string;
  view_count: string;
  like_count?: string;
  comment_count?: string;
}

const SaraṃśaPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<ReelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidInstagramUrl = (url: string): boolean => {
    const instagramReelRegex = /^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?$/;
    return instagramReelRegex.test(url);
  };

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter an Instagram Reel URL');
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setError('Please enter a valid Instagram Reel URL');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('https://daunrodo.onrender.com/api/instagram/reel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze the reel. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: string | undefined): string => {
    if (!num) return 'N/A';
    const number = parseInt(num.replace(/,/g, ''));
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
    if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
    return num;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-3">
            sārāṃśa
          </h1>
          {/* <p className="text-lg text-gray-600 font-light">
            Instagram Reel Content Analyzer
          </p> */}
        </div>

        {/* URL Input Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Reel URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full px-4 py-3 pr-12 border text-background caret-background placeholder:text-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
                <Search className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading || !url.trim()}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Reel'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {data && (
          <div className="space-y-6">
            {/* Source URL */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Source</h2>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all flex items-center gap-2 group"
              >
                <span className="break-all">{data.url}</span>
                <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Caption */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Caption</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.caption}
              </p>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Transcript</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.transcript}
              </p>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Metadata</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-medium text-gray-900">{data.author}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">{data.duration}</p>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium text-gray-900">{data.language}</p>
                  </div>
                </div>

                {/* Views */}
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Views</p>
                    <p className="font-medium text-gray-900">{formatNumber(data.view_count)}</p>
                  </div>
                </div>

                {/* Likes */}
                {data.like_count && (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">♡</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Likes</p>
                      <p className="font-medium text-gray-900">{formatNumber(data.like_count)}</p>
                    </div>
                  </div>
                )}

                {/* Comments */}
                {data.comment_count && (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">💬</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Comments</p>
                      <p className="font-medium text-gray-900">{formatNumber(data.comment_count)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hashtags */}
              {data.hashtags && data.hashtags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="h-5 w-5 text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-900">Hashtags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaraṃśaPage;