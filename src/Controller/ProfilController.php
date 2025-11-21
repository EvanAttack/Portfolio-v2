<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ProfilController extends AbstractController
{
    #[Route('/', name: 'app_profil')]
    public function index(): Response
    {
        return $this->render('profil/index.html.twig', [
            'controller_name' => 'ProfilController',
        ]);
    }
    #[Route('/myavatar', name: 'myavatar')]
    public function myavatar(): Response
    {
        return $this->render('projets/myAvatar.html.twig', [
            'controller_name' => 'ProfilController',
        ]);
    }
}
