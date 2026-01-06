<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ProfilController extends AbstractController
{
    #[Route('/', name: 'home')]
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
    #[Route('/projects', name: 'projects')]
    public function projects(): Response
    {
        return $this->render('projets/myAvatar.html.twig', [
            'controller_name' => 'ProfilController',
        ]);
    }
    #[Route('/skills', name: 'skills')]
    public function skills(): Response
    {
        return $this->render('projets/myAvatar.html.twig', [
            'controller_name' => 'ProfilController',
        ]);
    }
    #[Route('/contact', name: 'contact')]
    public function contact(): Response
    {
        return $this->render('projets/myAvatar.html.twig', [
            'controller_name' => 'ProfilController',
        ]);
    }

}
