"use client";

import { useEffect, useState } from "react";
import { getIdentitas } from "@/actions/identitas.actions";

interface UseIdentitasResult {
  data: Record<string, string>;
  loading: boolean;
}

export function useIdentitas(): UseIdentitasResult {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const result = await getIdentitas();
      if (result.success && result.data) {
        const map: Record<string, string> = {};
        result.data.forEach((item) => {
          map[item.name] = item.value;
        });
        setData(map);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  return { data, loading };
}
