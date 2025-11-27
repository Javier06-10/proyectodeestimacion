"use client";

import React, { useState, useMemo } from "react";



type Task = {
    id: string;
    name: string;
    optimistic: number;
    mostLikely: number;
    pessimistic: number;
};

const calcPertExpected = (o: number, m: number, p: number) => {
    return (o + 4 * m + p) / 6;
};

const calcPertVariance = (o: number, p: number) => {
    const sd = (p - o) / 6;
    return sd * sd;
};

function formatNumber(n: number) {
    return Number.isFinite(n) ? n.toFixed(2) : "-";
}

export default function Estimacioncoste() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [name, setName] = useState("");
    const [o, setO] = useState<string>("");
    const [m, setM] = useState<string>("");
    const [p, setP] = useState<string>("");

    const addTask = () => {
        const oNum = parseFloat(o);
        const mNum = parseFloat(m);
        const pNum = parseFloat(p);
        if (!name.trim() || Number.isNaN(oNum) || Number.isNaN(mNum) || Number.isNaN(pNum))
            return;
        const task: Task = {
            id: String(Date.now() + Math.random()),
            name: name.trim(),
            optimistic: oNum,
            mostLikely: mNum,
            pessimistic: pNum,
        };
        setTasks((s) => [...s, task]);
        setName("");
        setO("");
        setM("");
        setP("");
    };

    const updateTask = (id: string, fields: Partial<Task>) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...fields } : t))
        );
    };

    const removeTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const totals = useMemo(() => {
        let expectedSum = 0;
        let varianceSum = 0;
        for (const t of tasks) {
            const e = calcPertExpected(t.optimistic, t.mostLikely, t.pessimistic);
            const v = calcPertVariance(t.optimistic, t.pessimistic);
            expectedSum += e;
            varianceSum += v;
        }
        return {
            expectedSum,
            varianceSum,
            standardDeviation: Math.sqrt(varianceSum),
        };
    }, [tasks]);

    return (
        <div style={{ padding: 16, fontFamily: "Inter, system-ui, sans-serif" }}>
            <h1>Estimación de coste (método PERT)</h1>

            <section style={{ marginBottom: 20 }}>
                <h2>Añadir tarea</h2>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <input
                        placeholder="Nombre tarea"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: 8, minWidth: 160 }}
                    />
                    <input
                        placeholder="Optimista (O)"
                        value={o}
                        onChange={(e) => setO(e.target.value)}
                        style={{ padding: 8, width: 120 }}
                        inputMode="decimal"
                    />
                    <input
                        placeholder="Más probable (M)"
                        value={m}
                        onChange={(e) => setM(e.target.value)}
                        style={{ padding: 8, width: 120 }}
                        inputMode="decimal"
                    />
                    <input
                        placeholder="Pesimista (P)"
                        value={p}
                        onChange={(e) => setP(e.target.value)}
                        style={{ padding: 8, width: 120 }}
                        inputMode="decimal"
                    />
                    <button onClick={addTask} style={{ padding: "8px 12px" }}>
                        Añadir
                    </button>
                </div>
                <small style={{ color: "#666" }}>
                    Fórmula PERT: E = (O + 4·M + P) / 6. Varianza = ((P − O) / 6)^2
                </small>
            </section>

            <section>
                <h2>Tareas</h2>
                {tasks.length === 0 ? (
                    <p>No hay tareas añadidas.</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Tarea</th>
                                <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>O</th>
                                <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>M</th>
                                <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>P</th>
                                <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>E (PERT)</th>
                                <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Varianza</th>
                                <th style={{ borderBottom: "1px solid #ddd", padding: 8 }} />
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((t) => {
                                const expected = calcPertExpected(t.optimistic, t.mostLikely, t.pessimistic);
                                const variance = calcPertVariance(t.optimistic, t.pessimistic);
                                return (
                                    <tr key={t.id}>
                                        <td style={{ padding: 8 }}>
                                            <input
                                                value={t.name}
                                                onChange={(e) => updateTask(t.id, { name: e.target.value })}
                                                style={{ width: "100%", padding: 6 }}
                                            />
                                        </td>
                                        <td style={{ padding: 8 }}>
                                            <input
                                                value={String(t.optimistic)}
                                                onChange={(e) =>
                                                    updateTask(t.id, { optimistic: parseFloat(e.target.value) || 0 })
                                                }
                                                style={{ width: "100%", padding: 6 }}
                                                inputMode="decimal"
                                            />
                                        </td>
                                        <td style={{ padding: 8 }}>
                                            <input
                                                value={String(t.mostLikely)}
                                                onChange={(e) =>
                                                    updateTask(t.id, { mostLikely: parseFloat(e.target.value) || 0 })
                                                }
                                                style={{ width: "100%", padding: 6 }}
                                                inputMode="decimal"
                                            />
                                        </td>
                                        <td style={{ padding: 8 }}>
                                            <input
                                                value={String(t.pessimistic)}
                                                onChange={(e) =>
                                                    updateTask(t.id, { pessimistic: parseFloat(e.target.value) || 0 })
                                                }
                                                style={{ width: "100%", padding: 6 }}
                                                inputMode="decimal"
                                            />
                                        </td>
                                        <td style={{ padding: 8 }}>{formatNumber(expected)}</td>
                                        <td style={{ padding: 8 }}>{formatNumber(variance)}</td>
                                        <td style={{ padding: 8 }}>
                                            <button onClick={() => removeTask(t.id)} style={{ padding: "6px 8px" }}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot style={{paddingTop:"40px", height:"150px"}}>
                            <tr>
                                <td style={{ padding: 8, fontWeight: "bold" }}>Totales</td>
                                <td />
                                <td />
                                <td />
                                <td style={{ padding: 8, fontWeight: "bold" }}>{formatNumber(totals.expectedSum)}</td>
                                <td style={{ padding: 8, fontWeight: "bold" }}>{formatNumber(totals.varianceSum)}</td>
                                <td style={{ padding: 8 }}>
                                    <small>SD: {formatNumber(totals.standardDeviation)}</small>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </section>
        </div>
    );
}