import MainLayout from "../../../components/admin/layout/mainLayout";
import { useState, useEffect } from "react";
import Detail from "../../../components/admin/konten/kontenDetail";
import { useRouter } from "next/router";

export default function AdminProfile() {


    return (
        <>
            <MainLayout>
                <Detail />
            </MainLayout>
        </>
    )
}