'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, User, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

const MOCK_REVIEWS: Record<string, Review[]> = {
    "Simba Supermarket Remera": [
        { id: 1, user: "Kevine I.", rating: 5, comment: "Very fast preparation! My milk was still cold when I picked it up.", date: "2 days ago" },
        { id: 2, user: "Patrick N.", rating: 4, comment: "Good service, but parking was a bit tight.", date: "1 week ago" }
    ],
    "Simba Supermarket Kimironko": [
        { id: 3, user: "Sonia M.", rating: 5, comment: "The staff is so friendly. Highly recommend this branch.", date: "3 days ago" }
    ]
};

export default function BranchReviews({ branch }: { branch: string }) {
    const [reviews, setReviews] = useState(MOCK_REVIEWS[branch] || []);
    const [isAdding, setIsAdding] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);

    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: Date.now(),
            user: "You",
            rating: newRating,
            comment: newComment,
            date: "Just now"
        };
        setReviews([review, ...reviews]);
        setNewComment('');
        setIsAdding(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-lg font-black text-lg">
                        {averageRating}
                    </div>
                    <div>
                        <div className="flex text-orange-500">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className={cn("w-3 h-3 fill-current", s > Math.round(Number(averageRating)) && "opacity-20")} />)}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{reviews.length} reviews</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:underline"
                >
                    Leave a review
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.form 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl space-y-4 overflow-hidden"
                    >
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(s => (
                                <button type="button" key={s} onClick={() => setNewRating(s)}>
                                    <Star className={cn("w-5 h-5", s <= newRating ? "text-orange-500 fill-current" : "text-slate-300")} />
                                </button>
                            ))}
                        </div>
                        <textarea 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your experience..."
                            className="w-full bg-white dark:bg-slate-800 border-none rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                            rows={3}
                            required
                        />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
                            <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest">Submit</button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scroll">
                {reviews.map(r => (
                    <div key={r.id} className="border-b dark:border-slate-700 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">
                                    {r.user.charAt(0)}
                                </div>
                                <span className="text-xs font-bold dark:text-slate-200">{r.user}</span>
                                {r.user === "You" && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                            </div>
                            <span className="text-[10px] text-slate-400">{r.date}</span>
                        </div>
                        <div className="flex text-orange-500 mb-1">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className={cn("w-2 h-2 fill-current", s > r.rating && "opacity-20")} />)}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">"{r.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
