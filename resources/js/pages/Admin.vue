<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

type AdminUser = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
    created_at: string;
};

const page = usePage<{ users: AdminUser[]; flash: { success?: string } }>();
const users = computed<AdminUser[]>(() => page.props.users || []);
const flashSuccess = computed(() => String(page.props.flash?.success || ''));
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
</script>

<template>
    <Head title="Admin Panel" />

    <div class="flex h-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div class="flex flex-col gap-3 rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-slate-950">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 class="text-2xl font-semibold">Admin Panel</h1>
                    <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Просмотр и управление пользователями. Доступно только администраторам.
                    </p>
                </div>
                <Link href="/dashboard" class="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-300">
                    Back to dashboard
                </Link>
            </div>

            <div v-if="flashSuccess" class="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-950/40 dark:text-emerald-200">
                {{ flashSuccess }}
            </div>

            <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead class="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                        <tr>
                            <th class="px-4 py-3">ID</th>
                            <th class="px-4 py-3">Name</th>
                            <th class="px-4 py-3">Email</th>
                            <th class="px-4 py-3">Role</th>
                            <th class="px-4 py-3">Joined</th>
                            <th class="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-950">
                        <tr v-for="user in users" :key="user.id">
                            <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{{ user.id }}</td>
                            <td class="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">{{ user.name }}</td>
                            <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{{ user.email }}</td>
                            <td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                                <span class="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]" :class="user.role === 'admin' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'">
                                    {{ user.role }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{{ new Date(user.created_at).toLocaleDateString() }}</td>
                            <td class="px-4 py-3">
                                <form :action="`/admin/users/${user.id}/toggle-role`" method="post" class="inline">
                                    <input type="hidden" name="_token" :value="csrfToken" />
                                    <button
                                        type="submit"
                                        class="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-300"
                                    >
                                        {{ user.role === 'admin' ? 'Revoke' : 'Make admin' }}
                                    </button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
