'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
    LayoutDashboard, Package, Users, Settings, 
    Search, Bell, Filter, MoreVertical, CheckCircle2, 
    Clock, AlertCircle, ArrowRight, UserPlus, 
    TrendingUp, ShoppingBag, MapPin, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

// Mock Data
const BRANCHES = [
    "Simba Remera", "Simba Kimironko", "Simba Kacyiru", 
    "Simba Nyamirambo", "Simba Gikondo", "Simba Kanombe"
];

const MOCK_ORDERS = [
    { id: 'SMB-1024', customer: 'Jean Paul', branch: 'Simba Remera', total: 12500, status: 'pending', time: '10 mins ago', staff: null },
    { id: 'SMB-1025', customer: 'Marie Claire', branch: 'Simba Remera', total: 4500, status: 'assigned', time: '25 mins ago', staff: 'Alex' },
    { id: 'SMB-1026', customer: 'Eric G.', branch: 'Simba Remera', total: 8200, status: 'ready', time: '40 mins ago', staff: 'Sarah' },
    { id: 'SMB-1027', customer: 'Alice U.', branch: 'Simba Kimironko', total: 21000, status: 'pending', time: '1 hour ago', staff: null },
];

const STAFF = ["Alex", "Sarah", "Bosco", "Divine"];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [role, setRole] = useState<'manager' | 'staff'>('manager');
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [activeTab, setActiveTab] = useState('orders');
    const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

    const handleAssign = (orderId: string, staffName: string) => {
        setOrders(prev => prev.map(o => 
            o.id === orderId ? { ...o, status: 'assigned', staff: staffName } : o
        ));
        toast.success(`Assigned to ${staffName}`);
    };

    const handleComplete = (orderId: string) => {
        setOrders(prev => prev.map(o => 
            o.id === orderId ? { ...o, status: 'ready' } : o
        ));
        toast.success("Order marked as ready for pick-up");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-black dark:text-white mb-2">Access Denied</h1>
                    <p className="text-slate-500 mb-6">Please sign in to access the dashboard.</p>
                    <a href="/" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Return Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col lg:flex-row font-sans selection:bg-orange-200">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72 bg-white dark:bg-slate-800 border-r dark:border-slate-700 p-6 flex flex-col gap-8 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-black text-xl tracking-tight dark:text-white leading-none">SIMBA</h1>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">Operations</p>
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all",
                            activeTab === 'orders' ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                        )}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Orders
                    </button>
                    <button 
                        onClick={() => setActiveTab('inventory')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all",
                            activeTab === 'inventory' ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                        )}
                    >
                        <Package className="w-5 h-5" />
                        Inventory
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <Users className="w-5 h-5" />
                        Staff
                    </button>
                </div>

                <div className="pt-6 border-t dark:border-slate-700">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-700 mb-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Logged in as</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] text-white font-black">
                                {user.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold dark:text-white truncate">{user.name}</p>
                                <p className="text-[10px] text-slate-500 capitalize">{role}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl font-black dark:text-white tracking-tight">
                            {activeTab === 'orders' ? 'Order Management' : 'Inventory Tracking'}
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                                <MapPin className="w-4 h-4" />
                                <select 
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="bg-transparent font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
                                >
                                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="h-4 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                                <button 
                                    onClick={() => setRole('manager')}
                                    className={cn("px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all", role === 'manager' ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700")}
                                >
                                    Manager
                                </button>
                                <button 
                                    onClick={() => setRole('staff')}
                                    className={cn("px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all", role === 'staff' ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700")}
                                >
                                    Staff
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search order ID..."
                                className="bg-white dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 w-64 outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                            />
                        </div>
                        <button className="relative p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700">
                            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {activeTab === 'orders' ? (
                    <div className="space-y-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border dark:border-slate-700">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Orders Today</p>
                                <div className="flex items-end justify-between">
                                    <h3 className="text-3xl font-black dark:text-white">42</h3>
                                    <div className="flex items-center text-green-500 text-xs font-bold gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                        <TrendingUp className="w-3 h-3" />
                                        +12%
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border dark:border-slate-700">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg. Prep Time</p>
                                <div className="flex items-end justify-between">
                                    <h3 className="text-3xl font-black dark:text-white">18m</h3>
                                    <div className="text-slate-500 text-xs font-bold">Fast!</div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border dark:border-slate-700">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">No-Shows</p>
                                <div className="flex items-end justify-between">
                                    <h3 className="text-3xl font-black dark:text-white">2</h3>
                                    <div className="text-red-500 text-xs font-bold">Requires Action</div>
                                </div>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border dark:border-slate-700 overflow-hidden">
                            <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                                <h4 className="font-black dark:text-white">Recent Orders</h4>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                    <Filter className="w-4 h-4 text-slate-500" />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Time</th>
                                            <th className="px-6 py-4">Assigned To</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-slate-700">
                                        {orders.filter(o => o.branch === selectedBranch || role === 'manager').map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                                <td className="px-6 py-4 font-black dark:text-white">{order.id}</td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold dark:text-slate-200">{order.customer}</p>
                                                    <p className="text-xs text-slate-500">{formatPrice(order.total)}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1 w-fit",
                                                        order.status === 'pending' ? "bg-orange-100 text-orange-600" :
                                                        order.status === 'assigned' ? "bg-blue-100 text-blue-600" :
                                                        "bg-green-100 text-green-600"
                                                    )}>
                                                        {order.status === 'pending' && <Clock className="w-3 h-3" />}
                                                        {order.status === 'assigned' && <ArrowRight className="w-3 h-3" />}
                                                        {order.status === 'ready' && <CheckCircle2 className="w-3 h-3" />}
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-500">{order.time}</td>
                                                <td className="px-6 py-4 text-sm font-bold dark:text-slate-300">
                                                    {order.staff || "—"}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {role === 'manager' && order.status === 'pending' ? (
                                                        <div className="flex justify-end gap-2">
                                                            {STAFF.slice(0, 2).map(s => (
                                                                <button 
                                                                    key={s}
                                                                    onClick={() => handleAssign(order.id, s)}
                                                                    className="text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
                                                                >
                                                                    Assign {s}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ) : order.status === 'assigned' ? (
                                                        <button 
                                                            onClick={() => handleComplete(order.id)}
                                                            className="text-[10px] font-black uppercase tracking-widest bg-green-500 text-white px-4 py-1.5 rounded-lg shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                                                        >
                                                            Mark Ready
                                                        </button>
                                                    ) : (
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Mock Inventory Items */}
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border dark:border-slate-700">
                                <div className="flex gap-4 mb-6">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                                        <Package className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-black dark:text-white leading-tight">Fresh Whole Milk</h4>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Dairy Section</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Stock</p>
                                        <h3 className={cn("text-2xl font-black", i === 3 ? "text-red-500" : "dark:text-white")}>{i === 3 ? '8' : '45'}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Price</p>
                                        <p className="text-lg font-bold dark:text-slate-300">1,200 RWF</p>
                                    </div>
                                </div>
                                <button className="w-full bg-slate-50 dark:bg-slate-900 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-95">
                                    Update Stock
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
