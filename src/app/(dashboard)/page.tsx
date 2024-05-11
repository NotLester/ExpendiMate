"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";

export default function Home() {
    const { onOpen } = useNewAccount();
    
	return (
		<>
			<Button onClick={onOpen}>Add an account</Button>
			<div className="max-w-screen-2xl mx-auto">Header</div>
		</>
	);
}

